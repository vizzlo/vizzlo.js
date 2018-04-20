export type Record = {};

export interface Style {
    width?: number;
    height?: number;
    font_zoom?: number;
    hide_title?: boolean;
    hide_branding?: boolean;
    hide_annotations?: boolean;
    subtitle?: string;
    footer?: string;
    margin?: {};
    annotations?: {}[];
    description?: string;
}

export interface Document {
    plugin_id: string;
    title?: string;
    settings?: any;
    style?: Style;
    theme?: string;
    custom_theme?: any;
    data?: Record[];
}
