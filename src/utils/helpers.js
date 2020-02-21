import {deepMerge} from "grommet/utils";
import {grommet} from "grommet/es6";

export const url='http://192.168.1.5:8080';

const colors = {
    selected: "#c5cfff"
};

export const customTheme = deepMerge(grommet, {
    global:{
        colors,
    },
});
