// webpack.config.js
import { DefinePlugin } from 'webpack';

export const plugins = [
    new DefinePlugin({
        'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
    })
];
