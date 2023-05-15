import React from "react"
import PropTypes from "prop-types"
import { Button as AntButton, Tooltip } from "antd"

const Button = props => (
    <Tooltip title={props.title}>
        <AntButton
            style={{
                ...props.style,
                ...(props.hasShadow && {
                    boxShadow: "rgba(0, 0, 0, 0.5) 0px 1px 10px 0px"
                }),
                ...(props.type === "success" && {
                    backgroundColor: "#4CAF50",
                    borderColor: "#4CAF50",
                    color: "#fff"
                })
            }}
            ghost={props.transparent}
            htmlType={props.htmlType}
            type={props.type}
            icon={props.icon}
            loading={props.loading}
            shape={props.circle ? "circle" : null}
            size={props.size}
            onClick={props.onClick}
            disabled={props.disabled}
            block={props.block}
        >
            {props.label || props.children}
        </AntButton>
    </Tooltip>
)

Button.propTypes = {
    label: PropTypes.string,
    transparent: PropTypes.bool,
    hasShadow: PropTypes.bool,
    htmlType: PropTypes.oneOf(["submit", "button"]),
    type: PropTypes.oneOf(["primary", "default", "dashed", "danger", "success", "link"]),
    icon: PropTypes.node,
    loading: PropTypes.bool,
    circle: PropTypes.bool,
    size: PropTypes.oneOf(["small", "default", "large"]),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    title: PropTypes.string
}

Button.defaultProps = {
    label: null,
    transparent: false,
    hasShadow: false,
    htmlType: "button",
    type: "primary",
    icon: null,
    loading: false,
    circle: false,
    size: "default",
    onClick: null,
    disabled: false,
    children: null,
    title: null
}

export default Button
