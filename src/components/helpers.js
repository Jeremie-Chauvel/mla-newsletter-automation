// import xpath from 'xpath';
// import parse5 from 'parse5';
// import { DOMParser } from 'xmldom';
import sanitizeHtml from 'sanitize-html';

/**
 *
 * @param {Object.<string, string>} mapToReplace
 * @param {string} blockTemplate
 *
 **/
export const replaceInTemplate = (mapToReplace, blockTemplate) => {
  let generatedBlock = blockTemplate;
  for (const labelToReplace in mapToReplace) {
    generatedBlock = generatedBlock.replaceAll(
      labelToReplace,
      mapToReplace[labelToReplace],
    );
  }

  return generatedBlock;
};

/**
 *
 * @param {string} pageHTML
 * @param {Object.<string, string>} mapToFind
 *
 */
export const parseHTML = (pageHTML, mapToFind) => {
  // another parser
  // const parsedDocument = parse5.parse(pageHTML);
  // uncomment xmldom to use xml parser
  const parsedDocument = new DOMParser().parseFromString(
    // sanitize-html as wordpress generated invalid HTML
    sanitizeHtml(pageHTML, {
      allowedTags: [
        'address',
        'article',
        'aside',
        'footer',
        'header',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'hgroup',
        'main',
        'nav',
        'section',
        'blockquote',
        'dd',
        'div',
        'dl',
        'dt',
        'figcaption',
        'figure',
        'hr',
        'li',
        'main',
        'ol',
        'p',
        'pre',
        'ul',
        'a',
        'abbr',
        'b',
        'bdi',
        'bdo',
        'br',
        'cite',
        'code',
        'data',
        'dfn',
        'em',
        'i',
        'img',
        'kbd',
        'mark',
        'q',
        'rb',
        'rp',
        'rt',
        'rtc',
        'ruby',
        's',
        'samp',
        'small',
        'span',
        'strong',
        'sub',
        'sup',
        'time',
        'u',
        'var',
        'wbr',
        'caption',
        'col',
        'colgroup',
        'table',
        'tbody',
        'td',
        'tfoot',
        'th',
        'thead',
        'tr',
        'body',
        'html',
      ],
      allowedAttributes: {
        img: ['src'],
        // enable class attribute to use selector
        '*': ['class'],
      },
      disallowedTagsMode: 'discard', // set to 'recursiveEscape' for debugging:
    }),
    'text/xml',
  );
  const mapFound = {};
  for (const labelToFind in mapToFind) {
    /*
    xpath selection
    const expr = xpath.parse(mapToFind[labelToFind]);
    mapFound[labelToFind] = expr.select({
      node: parsedDocument,
      isHtml: true,
    });
    */

    const selectedElement = parsedDocument.querySelector(
      mapToFind[labelToFind],
    );
    mapFound[labelToFind] = selectedElement ? selectedElement.innerHTML : '';
  }

  return mapFound;
};
