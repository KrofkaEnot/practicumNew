import Block from "../../utils/Block";

export class IndexPage extends Block {

    constructor(props: { buttonLabel: string }) {
        super({
            ...props,
            onClick: () => console.log('Login page click')
        });
    }

    render() {
        return /*HTML*/`
                <div class="card">
                <form class="form">
                {{{Button label=buttonLabel onClick=onClick}}}
                {{{Button label="Авторизоваться" onClick=onClick}}}
                {{{Button label="Регистрация" onClick=onClick}}}
                {{{Button label=buttonLabel1 onClick=onClick}}}
                </form>
                </div>
                `
    }
}
