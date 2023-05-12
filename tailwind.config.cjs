module.exports = {
    content: [
        "./src/**/*.{html,js}",
        "./**/*.{html,js}"
    ],
    theme: {
        extend: {},
        keyframes: {
            heartBeat: {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.40)' },
                '100%': { transform: 'scale(1)' },
            }
        },
        animation: {
            heartBeat: 'heartBeat .5s linear'
        }
    },
    plugins: [],
}