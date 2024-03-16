import { ProvidePlugin } from 'webpack';

export const plugins = [
    // ... other plugins ...
    new ProvidePlugin({
        process: 'process/browser', // Provide a path to process/browser
    }),
];

