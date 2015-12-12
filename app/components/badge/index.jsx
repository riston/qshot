
import Radium from "radium";
import React  from "react";

const Badge = props => {

    return (
        <div style={[props.isVisible && styles.hide, styles.main]}>
            {props.text}
        </div>
    );
}

export default Radium(Badge);

const styles = {

    hide: {
        display: "none",
    },

    main: {
        position: "absolute",
        display: "block",
        bottom: "10px",
        left: "50%",
        transform: "translate(-50%, 0)",
        background: "#73C1E2",
        padding: "0.2em",
        borderRadius: "5px",
        color: "#FFF",
        fontSize: "0.9em",
        fontWeight: "900",
        fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
    }
};
