/**
 * Создание компонента кнопки
 */
import Block from '../../utils/Block';

interface ButtonProps {
    label: string;
    // styles: string;
    onClick?: () => void;
}

export class Button extends Block {
    constructor({ label, onClick }: ButtonProps) {
        super({
            label,
            // buttonLabel: 'timer scr/index.ts',
            // styles, // дополнительно создать импорт для стиля pcss
            events: {
                click: onClick
            }
        });
    }

    render() {
        // return this.compile(template, { ...this.props });
        /**
         * Есть возможность использовать строковые литералы 
         * JS и вставлять их:
         * <button class="button ${this.props.label}" type="button">
         * <button class="{{styles.button}}" type="button"> - применить импортированный стиль 
         * 
         */

        return /*HTML*/ `
        <button class="button" type="button">
        {{ label }}
        </button>
        `;

        return /*HTML*/`
        <nav>
        <button class="button" type="button" onclick="renderPage('home')">Домой</button>
        <button class="button" type="button" onclick="renderPage('profile')">Профиль</button>
        <button class="button" type="button" onclick="renderPage('auth')">Вход</button>
        <button class="button" type="button" onclick="renderPage('forgot')">Вспомнить пароль</button>
        <button class="button" type="button" onclick="renderPage('reg')">Регистрация</button>
        </nav>
        `

    }
}
