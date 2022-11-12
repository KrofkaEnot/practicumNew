import styleButtons from './ui/button/buttons.scss'
import styleForm from './pages/pages.scss'
import button from './ui/button/buttons.hbs';
import Handlebars from '../node_modules/handlebars/dist/handlebars.runtime';
import { inputsWithSpecificAttributes, homeAttr } from "./globName"
//______________GLOBAL fun__________________\\
window.renderPage = renderPage;

//page templates\\ 
import homeTemplate from './pages/home.hbs';
import profileTemplate from './pages/profile.hbs';
import authTemplate from './pages/auth.hbs';
import forgotYourPassTemplate from './pages/forgotYourPass.hbs';
import regTemplate from './pages/reg.hbs';
import err404Template from './pages/404.hbs';
import err500Template from './pages/5XX.hbs';

const PAGES = {
    'home': homeTemplate,
    'profile': profileTemplate,
    'auth': authTemplate,
    'forgot': forgotYourPassTemplate,
    'reg': regTemplate,
    'err404': err404Template,
    'err500': err500Template,
}

function renderPage(name) {
    const mapPAGES = new Map(Object.entries(PAGES));
    const template = mapPAGES.get(name)

    const root = document.querySelector('#app');
    const html = template(inputsWithSpecificAttributes);
    root.innerHTML = html;
}

//_________________________________________________\\
document.addEventListener('DOMContentLoaded', () => {
    Handlebars.registerPartial('button', button);

    const html = homeTemplate(inputsWithSpecificAttributes);

    const root = document.querySelector('#app');
    root.innerHTML = html;

    // setTimeout(() => {
    //     const newHtml = template({ username: 'Odoil Born' });
    //     root.innerHTML = newHtml;
    // }, 3000)
});
