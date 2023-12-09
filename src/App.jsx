import { useEffect, useState, useRef } from 'react'
import './App.css'

import { generateSelector, tagNames, pseudoClasses, pseudoElements, names, combinators } from '../selectorGenerator'

const descriptions = {
  div: 'Block Container',
  p: 'Paragraph',
  input: 'Input',
  a: 'Anchor',
  button: 'Button',
  span: 'Inline Container',
  ul: 'Unordered List',
  li: 'List Item',
  table: 'Table tag element',

  ':first-child': 'First Child pseudoClass',
  ':last-child': 'Last Child pseudoClass',
  ':nth-child(even)': 'Even Child pseudoClass',
  ':nth-child(odd)': 'Odd Child pseudoClass',
  ':active': 'Active pseudoClass',
  ':checked': 'Checked pseudoClass',
  ':visited': 'Visited pseudoClass',
  ':hover': 'Hover pseudoClass',

  '::before': 'Before pseudoElement',
  '::after': 'After pseudoElements',
  '::first-letter': 'First Letter pseudoElements',
  '::first-line': 'First Line pseudoElements',

  ' ': 'Descendant Combinator',
  ' > ': 'Child Combinator',
  ' + ': 'Next-sibling Combinator',
  ' ~ ': 'Subsequent-sibling Combinator',
};

const explanations = {
  ':first-child': 'This is a pseudoClasses. Selects the first child of a parent element.',
  ':last-child': 'This is a pseudoClasses. Selects the last child of a parent element.',
  ':nth-child(even)': 'This is a pseudoClasses. Selects even-numbered children of an element.',
  ':nth-child(odd)': 'This is a pseudoClasses. Selects odd-numbered children of an element.',
  ':active': 'This is a pseudoClasses. Selects the active link.',
  ':checked': 'This is a pseudoClasses. Selects checked input elements.',
  ':visited': 'This is a pseudoClasses. Selects visited links.',
  ':hover': 'This is a pseudoClasses. Selects an element when you mouse over it.',
  
  '::before': 'This is a pseudoElements. Inserts content before the content of the selected element.',
  '::after': 'This is a pseudoElements. Inserts content after the content of the selected element.',
  '::first-letter': 'This is a pseudoElements. Selects the first letter of the text content.',
  '::first-line': 'This is a pseudoElements. Selects the first line of the text content.',
  
  ' ': 'Descendant combinator  Selects all elements that are descendants of a specified element.',
  ' > ': 'Child combinator  Selects all direct child elements specified by "child" of elements specified by "parent".',
  ' + ': 'Next-sibling combinator  Selects the next sibling element.',
  ' ~ ': 'Subsequent-sibling combinator  Selects all sibling elements that follow the specified element.',

  'div': 'Represents a block-level container element.',
  'p': 'Represents a paragraph element.',
  'input': 'Represents an input element, such as a text box or checkbox.',
  'a': 'Represents an anchor (link) element.',
  'button': 'Represents a clickable button element.',
  'span': 'Represents an inline container.',
  'ul': 'Represents an unordered list element.',
  'li': 'Represents a list item element.',
  'ol': 'Represents an ordered list element.',
  'form': 'Represents an HTML form for user input.',
  'label': 'Represents a label for an <input> element.',
  'h1': 'Represents a top-level heading element.',
  'h2': 'Represents a second-level heading element.',
  'legend': 'Represents a caption for the content of a <fieldset>.',
  'textarea': 'Represents a multiline text input control.',
  'select': 'Represents a dropdown list.',
  'option': 'Represents an option in a <select> element.',
  'table': 'Represents a table element.',
  'tr': 'Represents a table row element.',
  'td': 'Represents a table data (cell) element.',
  'th': 'Represents a table header cell element.',
  'img': 'Represents an image element.',
  'section': 'Represents a generic section of a document.',
  'article': 'Represents an article or a piece of content.',
  'nav': 'Represents a navigation bar.',
  'fieldset': 'Represents a set of form controls within a <form>.',
  'figcaption': 'Represents a caption or legend for a <figure>.',
  'figure': 'Represents any content that is referenced from the main content, such as images.'
};

function App() {
  const [selector, setSelector] = useState(generateSelector());
  const idGuess= useRef(null);
  const classGuess = useRef(null);
  const elementGuess = useRef(null); 

  const [idGuessColor, setIdGuessColor] = useState('rounded-input');
  const [classGuessColor, setClassGuessColor] = useState('rounded-input');
  const [elementGuessColor, setElementGuessColor] = useState('rounded-input');

  const [tagDescription, setTagDescription] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [tagExplanation, setTagExplanation] = useState('');

  useEffect(() => {
    setSelector(generateSelector());
  }, []);

  function randomizeSelector()
  {
    const newSelector = generateSelector();
    setSelector(newSelector);
    idGuess.current.value = ''
    classGuess.current.value = ''
    elementGuess.current.value = ''
    setIdGuessColor('rounded-input')
    setClassGuessColor('rounded-input')
    setElementGuessColor('rounded-input')
    setTagValue('')
    setTagDescription('')
    setTagExplanation('')
    
  };

  function handleIdChange(value)
  {
    let val = parseInt(value);
    if (val == undefined) return
    if (val == idSpecificity) {
      setIdGuessColor('correct')
    }
    else {
      setIdGuessColor('in-correct')
    }
  }

  function handleClassChange(value)
  {
    let val = parseInt(value);
    if (val == undefined) return
    if (val == classSpecificity) {
      setClassGuessColor('correct')
    }
    else {
      setClassGuessColor('in-correct')
    }
  }

  function handleElementChange(value)
  {
    let val = parseInt(value);
    if (val == undefined) return
    if (val == elementSpecificity) {
      setElementGuessColor('correct')
    }
    else {
      setElementGuessColor('in-correct')
    }
  }
  
  const processTag = (tag) => {

  const classRegex = /^\.[a-zA-Z\-]+$/; 
  const idRegex = /^#[a-zA-Z]+$/;

  let tagDescription = ''
  if(tagNames.includes(tag)) {
    tagDescription = "This is a Html Tag Name"
  }
  else if(tag.match(classRegex)) {
    tagDescription="This is a Class Name"
  }
  else if(tag.match(idRegex)) {
    tagDescription="This is a HTML ID"
  }
  else if(descriptions.hasOwnProperty(tag))
  {
    tagDescription = descriptions[tag]
  }
  else {
    tagDescription = "Item explanation coming Soon"
  }
  return tagDescription
  }

  const handleTagClick = (tag) => {
    console.log("clicked", tag);

    const tag_value = `"${tag}":`
    const description = processTag(tag)
    const explanation = explanations[tag] ? `${explanations[tag]}` : '';
    const fullDescription = `"${tag_value}": ${description}${explanation}`;
    setTagValue(tag_value)
    setTagDescription(description)
    setTagExplanation(explanation)
    console.log(fullDescription);
  };


function calculateSpecificity(selector) {
  const idCount = selector.filter(part => part.startsWith('#')).length;
  const classPseudoAttrCount = selector.filter(part => 
    part.match(/^\.|^:/)
  ).length;
  const pseudoElementTagCount = selector.filter(part => part.match(/^[a-zA-Z]+/) || part.match(/^::/)).length;

  return [idCount, classPseudoAttrCount, pseudoElementTagCount];
}

  const [idSpecificity, classSpecificity, elementSpecificity] = calculateSpecificity(selector);
  console.log("idSpecificity--", idSpecificity)
  console.log("classSpecificity", classSpecificity)
  console.log("elementSpecificity --", elementSpecificity)

  return(
  <div className="app">
      <header>
        <title>Quiz App</title>
        <h1>CSS Quiz</h1>
      </header>
      <div className='quiz-container'>
      <div className="quiz-area">
        <div className="quiz-header">
          <div>Specificity</div>
          <button className="randomize-btn" onClick={randomizeSelector}>
            Randomize!
          </button>
        </div>
        <p>Guess the specificity of the following selector</p>
        <div className='random-selector'>
          {selector.map((part, index) => (
            <span
              key={index}
              tag={part}
              onClick={() => handleTagClick(part)}
            >
              {part}
            </span>
          ))}
        </div>
        <div>
        <input 
          type="text"
          name = "0"
          ref={idGuess}
          onChange={(e) => {handleIdChange(e.target.value)}}
          className ={idGuessColor}
          ></input>
          <span className="input-wrapper"></span>
        <input 
          type="text" 
          name = "1"
          ref={classGuess}
          onInput={(e) => handleClassChange(e.target.value)}
          className ={classGuessColor}
          ></input>
          <span className="input-wrapper"></span>
        <input 
          type="text"
          ref={elementGuess}
          onInput={(e) => handleElementChange(e.target.value)}
          className ={elementGuessColor}></input>
        </div>
        </div>
        <div className="description-area">
          <b> {tagValue} {tagDescription} </b>
        {tagExplanation && <p>{tagExplanation}</p>}
      </div>
    </div>
    </div>
)
}
export default App
