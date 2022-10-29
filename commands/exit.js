module.exports = {
    name: 'exit',
    description: 'Close the program',
    usage: 'exit',
    home: true,
    run: async () => {
        process.exit()
    }
}