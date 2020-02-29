import {deepMerge} from "grommet/utils";
import {grommet} from "grommet/es6";

export const url='http://192.168.100.26:8080';

const colors = {
    selected: "#c5cfff"
};

export const customTheme = deepMerge(grommet, {
    global:{
        colors
    },
    radioButton: {
        border: {
            width: "1px"
        },
        size: "16px", // affects the size of the outer circle
        icon: {
            color: "red",
            size: "20px" // affects the size of the inner circle
        },
        check: {
            color: "#869aff",
            radius: "100%"
        },
    }
});
