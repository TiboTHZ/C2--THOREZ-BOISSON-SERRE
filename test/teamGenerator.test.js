
const TeamGenerator = require('../src/teamGenerator.js');

describe('TeamGenerator', () => {
  const players = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank'];
  
  test('should generate the correct number of teams', () => {
    const generator = new TeamGenerator(players, 2);
    generator.generateTeams();
    expect(generator.teams).toHaveLength(3);
  });

  test('should distribute players evenly among teams', () => {
    const generator = new TeamGenerator(players, 2);
    generator.generateTeams();
    generator.teams.forEach(team => expect(team.players).toHaveLength(2));
  });

  test('should not have any player in multiple teams', () => {
    const generator = new TeamGenerator(players, 2);
    generator.generateTeams();
    const allTeamPlayers = generator.teams.flatMap(team => team.players);
    const uniquePlayers = new Set(allTeamPlayers);
    expect(uniquePlayers.size).toBe(players.length);
  });
});
