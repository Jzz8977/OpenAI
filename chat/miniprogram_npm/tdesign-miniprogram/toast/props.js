/* eslint-disable */
const props = {
    /** 图标排列方式 */
    direction: {
        type: String,
        value: 'row',
    },
    /** 弹窗显示毫秒数 */
    duration: {
        type: Number,
        value: 2000,
    },
    /** 组件类名 */
    externalClasses: {
        type: Array,
    },
    /** 自定义图标 */
    icon: {
        type: null,
    },
    /** 弹窗显示文字 */
    message: {
        type: String,
    },
    /** 遮罩层属性，透传至 Overlay */
    overlayProps: {
        type: Object,
        value: {},
    },
    /** 弹窗展示位置 */
    placement: {
        type: String,
        value: 'middle',
    },
    /** 防止滚动穿透，即不允许点击和滚动 */
    preventScrollThrough: {
        type: Boolean,
        value: false,
    },
    /** 是否显示遮罩层 */
    showOverlay: {
        type: Boolean,
        value: false,
    },
    /** 提示类型 */
    theme: {
        type: String,
    },
};
export default props;

//# sourceMappingURL=props.js.map
