// import SocketManager from './SocketManager/SocketScan.js';
import SocketManager from './SocketManager/SocketScan.js';
import qrScannerSource from './qr-scanner-source.js';

/*jslint sub: true, maxlen: 80, indent: 4 */

// ==ClosureCompiler==
// @output_file_name jquery.breakLines.min.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// @code_url http://goo.gl/eL6PR
// ==/ClosureCompiler==

(function ($) {
        "use strict";

        // Written for: http://stackoverflow.com/questions/4671713/#7431801
        // by Nathan MacInnes, nathan@macinn.es

        // use square bracket notation for Closure Compiler
        $.fn['breakLines'] = function (options) {
                var defaults = {
                        // HTML to insert before each new line
                        'lineBreakHtml': '<br />',
                        // Set this to true to have the HTML inserted at the start of a
                        // <p> or other block tag
                        'atStartOfBlocks': false,
                        // false: <LINEBREAK><span>text</span>;
                        // true: <span><LINEBREAK>text</span>
                        'insideStartOfTags': false,
                        // If set, the element's size will be set to this before being
                        // wrapped, then reset to its original value aftwerwards
                        'widthToWrapTo': false
                };
                options = $.extend(defaults, options);
                return this.each(function () {
                        var textNodes, // all textNodes (as opposed to elements)
                                copy, // jQuery object for copy of the current element
                                el = $(this), // just so we know what we're working with
                                recurseThroughNodes, // function to do the spitting/moving
                                insertedBreaks, // jQuery collection of inserted line breaks
                                styleAttr; // Backup of the element's style attribute

                        // Backup the style attribute because we'll be changing it
                        styleAttr = $(this).attr('style');

                        // Make sure the height will actually change as content goes in
                        el.css('height', 'auto');

                        // If the user wants to wrap to a different width than the one
                        // set by CSS
                        if (options.widthToWrapTo !== false) {
                                el.css('width', options.widthToWrapTo);
                        }

                        /*
                            This function goes through each node in the copy and splits
                            it up into words, then moves the words one-by-one to the
                            element. If the node it encounters isn't a text node, it
                            copies it to the element, then the function runs itself again,
                            using the copy as the currentNode and the equivilent in the
                            copy as the copyNode.
                        */
                        recurseThroughNodes = function (currentNode, copyNode) {
                                $(copyNode).contents().each(function () {
                                        var nextCopy,
                                                currentHeight;

                                        // update the height
                                        currentHeight = el.height();

                                        // If this is a text node
                                        if (this.nodeType === 3) {
                                                // move it to the original element
                                                $(this).appendTo(currentNode);
                                        } else {
                                                // Make an empty copy and put it in the original,
                                                // so we can copy text into it
                                                nextCopy = $(this).clone().empty()
                                                        .appendTo(currentNode);
                                                recurseThroughNodes(nextCopy, this);
                                        }

                                        // If the height has changed
                                        if (el.height() !== currentHeight) {
                                                // insert a line break and add to the list of
                                                // line breaks
                                                insertedBreaks = $(options.lineBreakHtml)
                                                        .insertBefore(this)
                                                        .add(insertedBreaks);
                                        }
                                });
                        };

                        // Clone the element and empty the original
                        copy = el.clone().insertAfter(el);
                        el.empty();

                        // Get text nodes: .find gets all non-textNode elements, contents
                        // gets all child nodes (inc textNodes) and the not() part removes
                        // all non-textNodes.
                        textNodes = copy.find('*').add(copy).contents()
                                .not(copy.find('*'));

                        // Split each textNode into individual textNodes, one for each
                        // word
                        textNodes.each(function (index, lastNode) {
                                var startOfWord = /\W\b/,
                                        result;
                                while (startOfWord.exec(lastNode.nodeValue) !== null) {
                                        result = startOfWord.exec(lastNode.nodeValue);
                                        // startOfWord matches the character before the start of a
                                        // word, so need to add 1.
                                        lastNode = lastNode.splitText(result.index + 1);
                                }
                        });

                        // Go through all the nodes, going recursively deeper, until we've
                        // inserted line breaks in all the text nodes
                        recurseThroughNodes(this, copy);

                        // We don't need the copy anymore
                        copy.remove();

                        // Clean up breaks at start of tags as per options
                        insertedBreaks.filter(':first-child').each(function () {
                                if (!options.atStartOfBlocks &&
                                        $(this).parent().css('display') === "block") {
                                        $(this).remove();
                                }
                                if (!options.insideStartOfTags) {
                                        $(this).insertBefore($(this).parent());
                                }
                        });
                        // Restore backed-up style attribute
                        $(this).attr('style', styleAttr);
                });
        };
}(jQuery));
document.getElementsByClassName("div_scaner_title_txt")[0].style.fontSize="50px";
boucle();
function boucle() {
        $('#div_scaner_title_txt').breakLines({
                lineBreakHtml: '<br>'
        });
        let inner = document.getElementById("div_scaner_title_txt").innerHTML;
        if (inner.includes("<br>")) {
                inner = inner.replaceAll(" <br>", " ");
                document.getElementById("div_scaner_title_txt").innerHTML = inner;
                let font=document.getElementsByClassName("div_scaner_title_txt")[0].style.fontSize;
                font=parseInt(font);
                font=font-1;
                document.getElementsByClassName("div_scaner_title_txt")[0].style.fontSize=font+"px";
                document.getElementsByClassName("div_scaner_title")[0].innerHTML=document.getElementsByClassName("div_scaner_title")[0].innerHTML.replaceAll("<br>","");
                boucle();
        }
}


document.getElementById("button_back").addEventListener("click", function (e) {
        modals.show("confirm_back");
})


function showCurrentInstruction(name, instruction) {
        document.getElementById("instructions_text").innerText = instruction;
        document.getElementById('div_scaner_title_txt').innerHTML = name;
}

SocketManager.getCurrentInstruction();

function showCurrentDescription(name, description) {
        document.getElementById('txt_title').innerHTML = name;
        document.querySelector("#txt_descr h3").innerText = description;
        modals.show("display_location", () => {
                SocketManager.getCurrentInstruction();
                qrScannerSource.startCam();
        });
}

function showWrongQrCode() {
        document.getElementById('txt_title').innerHTML = "Wrong QR Code !";
        document.querySelector("#txt_descr h3").innerText = "Find the good one following the instructions";
        modals.show("display_location", () => {
                qrScannerSource.startCam();
        });
}

function showEndGame() {
        document.getElementById('txt_title').innerHTML = "The end";
        document.querySelector("#txt_descr h3").innerText = "You have finished the route. We hope you like this !";
        qrScannerSource.stopCam();
        modals.show("display_location", () => {
                window.location.href = "user_route_list";
        });
}

function getCurrentDescription(data) {
        console.log("ICIIIIII");
        SocketManager.getCurrentDescription(data)
}

document.getElementById("div_scaner_title_txttt").style.fontSize="50px";
window.addEventListener("load", updateFontSize);

function updateFontSize() {
        var source = document.getElementsByClassName("sample");
        source=Array.from(source)
        source = source[0].firstChild;
        console.log(source);
        logLines( extractLinesFromTextNode( source ) );
        let lines = extractLinesFromTextNode( source );
        if(lines.length > 1){
                let fonsize=parseInt(document.getElementById("div_scaner_title_txttt").style.fontSize);
                fonsize=fonsize-1;
                document.getElementById("div_scaner_title_txttt").style.fontSize=fonsize+"px";
                updateFontSize();
        } 

}

// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //

/**
 * I extract the visually rendered lines of text from the given textNode as it
 * exists in the document at this very moment. Meaning, it returns the lines of
 * text as seen by the user.
 */
function extractLinesFromTextNode(textNode) {

        if (textNode.nodeType !== 3) {

                throw (new Error("Lines can only be extracted from text nodes."));

        }

        // BECAUSE SAFARI: None of the "modern" browsers seem to care about the actual
        // layout of the underlying markup. However, Safari seems to create range
        // rectangles based on the physical structure of the markup (even when it
        // makes no difference in the rendering of the text). As such, let's rewrite
        // the text content of the node to REMOVE SUPERFLUOS WHITE-SPACE. This will
        // allow Safari's .getClientRects() to work like the other modern browsers.
        textNode.textContent = collapseWhiteSpace(textNode.textContent);

        // A Range represents a fragment of the document which contains nodes and
        // parts of text nodes. One thing that's really cool about a Range is that we
        // can access the bounding boxes that contain the contents of the Range. By
        // incrementally adding characters - from our text node - into the range, and
        // then looking at the Range's client rectangles, we can determine which
        // characters belong in which rendered line.
        var textContent = textNode.textContent;
        var range = document.createRange();
        var lines = [];
        var lineCharacters = [];

        // Iterate over every character in the text node.
        for (var i = 0; i < textContent.length; i++) {

                // Set the range to span from the beginning of the text node up to and
                // including the current character (offset).
                range.setStart(textNode, 0);
                range.setEnd(textNode, (i + 1));

                // At this point, the Range's client rectangles will include a rectangle
                // for each visually-rendered line of text. Which means, the last
                // character in our Range (the current character in our for-loop) will be
                // the last character in the last line of text (in our Range). As such, we
                // can use the current rectangle count to determine the line of text.
                var lineIndex = (range.getClientRects().length - 1);

                // If this is the first character in this line, create a new buffer for
                // this line.
                if (!lines[lineIndex]) {

                        lines.push(lineCharacters = []);

                }

                // Add this character to the currently pending line of text.
                lineCharacters.push(textContent.charAt(i));

        }

        // At this point, we have an array (lines) of arrays (characters). Let's
        // collapse the character buffers down into a single text value.
        lines = lines.map(
                function operator(characters) {

                        return (collapseWhiteSpace(characters.join("")));

                }
        );

        // DEBUGGING: Draw boxes around our client rectangles.
        //drawRectBoxes(range.getClientRects());

        return (lines);

}


/**
 * I normalize the white-space in the given value such that the amount of white-
 * space matches the rendered white-space (browsers collapse strings of white-space
 * down to single space character, visually, and this is just updating the text to
 * match that behavior).
 */
function collapseWhiteSpace(value) {

        return (value.trim().replace(/\s+/g, " "));

}


/**
 * I draw red boxes on the screen for the given client rects.
 */
function drawRectBoxes(clientRects) {

        arrayFrom(document.querySelectorAll(".box")).forEach(
                function iterator(node) {

                        node.remove();

                }
        );

        arrayFrom(clientRects).forEach(
                function iterator(rect) {

                        var box = document.createElement("div");
                        box.classList.add("box")
                        box.style.top = (rect.y + "px");
                        box.style.left = (rect.x + "px");
                        box.style.width = (rect.width + "px");
                        box.style.height = (rect.height + "px");
                        document.body.appendChild(box);

                }
        );

}


/**
 * I log the given lines of text using a grouped output.
 */
function logLines(lines) {

        console.group("Rendered Lines of Text");

        lines.forEach(
                function iterator(line, i) {

                        console.log(i, line);

                }
        );

        console.groupEnd();

}


/**
 * I create a true array from the given array-like data. Array.from() if you are on
 * modern browsers.
 */
function arrayFrom(arrayLike) {

        return (Array.prototype.slice.call(arrayLike));

}



export default {
        showCurrentInstruction,
        showCurrentDescription,
        showWrongQrCode,
        getCurrentDescription,
        showEndGame,
        updateFontSize
}
