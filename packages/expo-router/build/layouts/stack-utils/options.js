"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendScreenStackPropsToOptions = appendScreenStackPropsToOptions;
exports.isChildOfType = isChildOfType;
const react_1 = require("react");
const react_native_1 = require("react-native");
const elements_1 = require("./elements");
function appendScreenStackPropsToOptions(options, props) {
    let updatedOptions = { ...options, ...props.options };
    function appendChildOptions(child, options) {
        if (child.type === elements_1.StackHeaderComponent) {
            updatedOptions = appendStackHeaderPropsToOptions(options, child.props);
        }
        else {
            console.warn(`Warning: Unknown child element passed to Stack.Screen: ${child.type.name ?? child.type}`);
        }
        return updatedOptions;
    }
    react_1.Children.forEach(props.children, (child) => {
        if ((0, react_1.isValidElement)(child)) {
            updatedOptions = appendChildOptions(child, updatedOptions);
        }
    });
    return updatedOptions;
}
function appendStackHeaderPropsToOptions(options, props) {
    const flattenedStyle = react_native_1.StyleSheet.flatten(props.style);
    const flattenedLargeStyle = react_native_1.StyleSheet.flatten(props.largeStyle);
    if (props.hidden) {
        return { ...options, headerShown: false };
    }
    if (props.asChild) {
        return { ...options, header: () => props.children };
    }
    let updatedOptions = {
        ...options,
        headerShown: !props.hidden,
        headerBlurEffect: props.blurEffect,
        headerStyle: {
            backgroundColor: flattenedStyle?.backgroundColor,
        },
        headerLargeStyle: {
            backgroundColor: flattenedLargeStyle?.backgroundColor,
        },
        headerShadowVisible: flattenedStyle?.shadowColor !== 'transparent',
        headerLargeTitleShadowVisible: flattenedLargeStyle?.shadowColor !== 'transparent',
    };
    function appendChildOptions(child, options) {
        if (child.type === elements_1.StackHeaderTitle) {
            updatedOptions = appendStackHeaderTitlePropsToOptions(updatedOptions, child.props);
        }
        else if (child.type === elements_1.StackHeaderLeft) {
            updatedOptions = appendStackHeaderLeftPropsToOptions(updatedOptions, child.props);
        }
        else if (child.type === elements_1.StackHeaderRight) {
            updatedOptions = appendStackHeaderRightPropsToOptions(updatedOptions, child.props);
        }
        else if (child.type === elements_1.StackHeaderBackButton) {
            updatedOptions = appendStackHeaderBackButtonPropsToOptions(updatedOptions, child.props);
        }
        else if (child.type === elements_1.StackHeaderSearchBar) {
            updatedOptions = appendStackHeaderSearchBarPropsToOptions(updatedOptions, child.props);
        }
        else {
            console.warn(`Warning: Unknown child element passed to Stack.Header: ${child.type.name ?? child.type}`);
        }
        return updatedOptions;
    }
    react_1.Children.forEach(props.children, (child) => {
        if ((0, react_1.isValidElement)(child)) {
            updatedOptions = appendChildOptions(child, updatedOptions);
        }
    });
    return updatedOptions;
}
function appendStackHeaderLeftPropsToOptions(options, props) {
    if (!props.asChild) {
        return options;
    }
    return {
        ...options,
        headerLeft: () => props.children,
    };
}
function appendStackHeaderRightPropsToOptions(options, props) {
    if (!props.asChild) {
        return options;
    }
    return {
        ...options,
        headerRight: () => props.children,
    };
}
function appendStackHeaderTitlePropsToOptions(options, props) {
    const flattenedStyle = react_native_1.StyleSheet.flatten(props.style);
    const flattenedLargeStyle = react_native_1.StyleSheet.flatten(props.largeStyle);
    return {
        ...options,
        title: props.children,
        headerLargeTitle: props.large,
        headerTitleAlign: flattenedStyle?.textAlign,
        headerTitleStyle: {
            ...flattenedStyle,
            color: flattenedStyle?.color ?? undefined,
        },
        headerLargeTitleStyle: {
            ...flattenedLargeStyle,
            fontWeight: flattenedLargeStyle?.fontWeight?.toString(),
            color: flattenedLargeStyle?.color ?? undefined,
        },
    };
}
function appendStackHeaderBackButtonPropsToOptions(options, props) {
    return {
        ...options,
        headerBackTitle: props.children,
        headerBackTitleStyle: props.style,
        headerBackImageSource: props.src,
        headerBackButtonDisplayMode: props.displayMode,
        headerBackButtonMenuEnabled: props.withMenu,
        headerBackVisible: !props.hidden,
    };
}
function appendStackHeaderSearchBarPropsToOptions(options, props) {
    return {
        ...options,
        headerSearchBarOptions: {
            ...props,
        },
    };
}
function isChildOfType(element, type) {
    return (0, react_1.isValidElement)(element) && element.type === type;
}
//# sourceMappingURL=options.js.map