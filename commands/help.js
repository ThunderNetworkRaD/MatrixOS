module.exports = {
    name: 'help',
    description: 'Need help?',
    usage: 'help',
    home: true,
    run: async (commands) => {
        commands.forEach((command) => {
            console.log(`\n${String(command.key).red}:\nDescription: ${command.value.description}\nUsage: ${command.value.usage}\n`)
        })
    }
}