import EventBus from './EventBus';
import { nanoid } from 'nanoid';
import { listeners } from 'process';
import Handlebars from 'handlebars';

// Нельзя создавать экземпляр данного класса
class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };
    /*
    Дублирование названия класса
    используется при мимификации класса 
    вместо Component.name
    static get componentName = 'Button';
    */
    public id = nanoid(6);
    private _meta: { props: any; };
    private _element: HTMLElement | null = null;
    protected props: any;
    public children: Record<string, Block>;
    private eventBus: () => EventBus;

    // private _meta: { tagName: string; props: any; };

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */

    /*
    constructor(tagName = "div", propsWithChildren: any = {}) {
        const eventBus = new EventBus();

        const { props, children } = this._getChildrenAndProps(propsWithChildren);

        this._meta = {
            tagName,
            props
        };

        this.children = children;
        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }
*/
    constructor(сhildrenAndProps: any = {}) {
        const eventBus = new EventBus();

        // console.log(сhildrenAndProps)
        const { props, children } = this._getChildrenAndProps(сhildrenAndProps);

        this.children = children;
        // console.log(children)
        // this.initChildren();

        this._meta = {
            props,
        }
        this.props = this._makePropsProxy(props);
        this.initChildren()
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildrenAndProps(childrenAndProps: any) {
        const props: any = {};
        const children: any = {};
        Object.entries(childrenAndProps).map(([key, value]) => {
            // console.log(Block)
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value) && value.every(v => (v instanceof Block))) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });
        return { props, children };
    }

    protected initChildren() { };

    _addEvents() {
        const { events = {} } = this.props as { events: Record<string, () => void> };
        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        // const { tagName } = this._meta;
        // this._element = this._createDocumentElement(tagName);

        this._element = this._createDocumentElement('div');
        // console.log(this._element)
    }


    private _init() {
        this._createResources();
        // console.log(this._createResources)
        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() { }

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() { }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        // Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps: any, newProps: any) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: any, newProps: any) {
        /**
         * Добавить более глубокое сравнение элементов
         */
        return true;
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    // _removeEvents() {
    //     const events: Record<string, () => void> = (this.props as any).events;
    //     if (!events || !this._element) {
    //         return;
    //     }
    //     Object.entries(events).forEach(([event, listener]) => {
    //         this._element!.removeEventListener(event, listener)
    //     });
    // }

    private _render() {
        const templateString = this.render();

        const fragment = this.compile(templateString, { ...this.props })
        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element) {
            // this._removeEvents();
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        // console.log(this._element)

        this._addEvents();
    }
    /**
     * 
     *  Возвращает разметку
     */
    protected render(): string {
        return ' ';
    }

    // protected render(): DocumentFragment {
    //     return new DocumentFragment();
    // }

    compile(templateString: string, context: any) {
        // console.log(templateString)
        /**
         * template - создаёт внутри себя documentFragment,
         * принимает в себя строку hbs файла
         * context - переменная для шаблона
         * new documentFragment - не имеет в себе innerHTML
         */
        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
        const template = Handlebars.compile(templateString);
        /**
         * Получение html строки из шаблона
         */
        const htmlString = template({ ...context, children: this.children });

        fragment.innerHTML = htmlString;

        // console.log(this.children)
        Object.entries(this.children).forEach(([key, child]) => {
            const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

            if (!stub) {
                return;
            }

            stub.replaceWith(child.getContent()!);
        });
        /**
         * HTMLTemplateElement - содержит в себе .content
         */
        return fragment.content;
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: any) {
        // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                /**
                 * Отфильтровывает функции и обычные значения
                 */
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = { ...target }

                target[prop] = value;
                // console.log()
                /**
                 * Обновляет компоненту
                 * Клонирование происходит некачественно
                 */
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this.getContent()!.style.display = "block";
    }

    hide() {
        this.getContent()!.style.display = "none";
    }
}

export default Block;
