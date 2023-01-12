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

document.getElementById("camera_help").addEventListener("click", function (e) {
        modals.show("display_camera_help");
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
        modals.show("display_location", () => {
                window.location.href = "user_route_list";
                //alert("Il faut rediriger vers la page user_route_list");
        });
}

function getCurrentDescription(data) {
        console.log("ICIIIIII");
        SocketManager.getCurrentDescription(data)
}

export default {
        showCurrentInstruction,
        showCurrentDescription,
        showWrongQrCode,
        getCurrentDescription,
        showEndGame
}
