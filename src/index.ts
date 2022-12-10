/**
 * TypeScript - для точки входа index.html
 */
// import { Button } from "./components/Button/button";
import { LoginPage } from "./pages/Login/login";
import { IndexPage } from "./pages/Index/index";
import { renderDOM } from "./utils/renderDOM";
import { registerComponent } from "./utils/registerComponent";

// registerComponent(Button);

document.addEventListener("DOMContentLoaded", () => {
    /**
     * После загруски всех DOM элементов
     * создаётся кнопка
     */

    //    const button = new Button({
    //        label: 'Нажми меня',
    //        events: {
    //            click: () => console.log('Clicked fun index.ts')
    //        }
    //    });

/*
    const indexPage = new IndexPage();
    renderDOM('#app', indexPage)
    indexPage.setProps({
        buttonLabel: 'Войти scr/index.ts'
    })
*/

/*
    const loginPage = new LoginPage();

    renderDOM('#app', loginPage)

    loginPage.setProps({
        buttonLabel: 'Войти scr/index.ts'
    })
    loginPage.setProps({
        buttonLabel1: 'Зарегестрироваться scr/index.ts'
    })
*/
    /*
    setTimeout(() => {
        loginPage.setProps({
            buttonLabel: 'Таймер scr/index.ts',
            events: {
                click: () => console.log('Clicked fun index.ts SetTimeout')
            }
        })
    }, 2000)
    */
    
    /*
    setTimeout(() => {
        button.setProps({
            label: 'Set Timeout',
            events: {
                click: () => console.log('Clicked fun index.ts SetTimeout')
            }
        })
    }, 2000)
    */

});
