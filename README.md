# expand-block
A small library that adds expand/collapse functionality on the
`HTMLElement` object prototype.

## Installation

Simply load the `expand-block.js` file. This library automatically
assigns new methods to `HTMLElement`.

## Usage

The goal of this library is to collapse and expand a block element. To
do so, an element must first have the `expand-block` class and an
inner block element with the class `expand-block-inner`. Without the
last class, the library won’t be able to work.

The second step is to add the following style in your CSS:

```css
.expand-block {
  /* Include this if you want the block to initially be collapsed */
  height: 0;

  /* This is mandatory */
  overflow: hidden;

  /* Include this to add an animation */
  transition: height 0.3s, border 0.2s;
}
```

### Selecting a block
In order to do any further operations, an element must first be
selected with JavaScript. The usual DOM selectors can be used. Note
however that using jQuery for selecting an element is not supported.

```javascript
var elem = document.querySelector('my-class');
```

### Expanding a block
To expand a block, simply call the `expand` method:

```javascript
elem.expand();
```

### Collapsing a block
To collapse a block, simply call the `collapse` method:

```javascript
elem.collapse();
```

## License
This directory and the whole project is subject to the [MIT License](license).
