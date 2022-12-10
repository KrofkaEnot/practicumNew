import Block from './Block';
import { HelperOptions } from "handlebars";
import Handlebars from 'handlebars';

export function registerComponent(Component: typeof Block) {
    Handlebars.registerHelper(Component.name, function ({ hash, data }: HelperOptions) {
        if (!data.root.children) {
            data.root.children = {};
        }
        const { children } = data.root;
        const component = new Component(hash);
        children[component.id] = component;
        return /*HTML*/ `<div data-id="id-${component.id}"></div>`;
    })
}
