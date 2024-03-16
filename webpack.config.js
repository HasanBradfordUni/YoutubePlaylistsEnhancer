import { DefinePlugin } from 'webpack';
import 'dotenv/config';

export const plugins = [
    new DefinePlugin({
        'process.env': JSON.stringify(process.env)
    })
];

