import {NodeType, serializedNodeWithId, wireframeStatusBar} from "./mobile.types";
import {STATUS_BAR_ID} from "./transformers";
import {makeStylesString} from "./wireframeStyle";

function spacerDiv(idSequence: Generator<number>): serializedNodeWithId {
    const spacerId = idSequence.next().value;
    return {
        type: NodeType.Element,
        tagName: 'div',
        attributes: {
            'style': 'width: 5px;',
            'data-rrweb-id': spacerId,
        },
        id: spacerId,
        childNodes: [],
    }
}

/**
 * tricky: we need to accept children because that's the interface of converters, but we don't use them
 */
export function makeStatusBar(wireframe: wireframeStatusBar, _children: serializedNodeWithId[], timestamp: number, idSequence: Generator<number>): serializedNodeWithId {
    const clockId = idSequence.next().value;
    // convert the wireframe timestamp to a date time, then get just the hour and minute of the time from that
    const clockTime = timestamp ? new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : ""
    const clock: serializedNodeWithId = {
        type: NodeType.Element,
        tagName: 'div',
        attributes: {
            'data-rrweb-id': clockId,
        },
        id: clockId,
        childNodes: [
            {
                type: NodeType.Text,
                textContent: clockTime,
                id: idSequence.next().value,
            },
        ]
    };

    return {
        type: NodeType.Element,
        tagName: 'div',
        attributes: {
            style: makeStylesString(wireframe) + 'display:flex;flex-direction:row;align-items:center',
            'data-rrweb-id': STATUS_BAR_ID,
        },
        id: STATUS_BAR_ID,
        childNodes: [
            spacerDiv(idSequence),
            clock
        ],
    }
}
