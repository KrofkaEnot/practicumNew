import Block from '../../core/Block';

import './link.css';

interface LinkProps {
  text: string;
  to: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      // const router = new Router();
      // router.go(this.props.to);

      console.log('link.ts file');

      e.preventDefault();
    }

    super({...props, events: { click: onClick }});
  }

  render() {
    // language=hbs
    return `<a href="{{to}}">{{text}}</a>`;
  }
}