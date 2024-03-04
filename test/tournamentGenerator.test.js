
const TournamentGenerator = require('../src/tournamentGenerator');

describe('TournamentGenerator', () => {
  const teams = [
    { name: 'Team 1', players: ['A', 'B', 'C'] },
    { name: 'Team 2', players: ['D', 'E', 'F'] },
    { name: 'Team 3', players: ['G', 'H', 'I'] },
    { name: 'Team 4', players: ['J', 'K', 'L'] },
    // ... assume more teams
  ];
  
  test('should generate poules correctly', () => {
    const generator = new TournamentGenerator(teams);
    generator.generatePoules();
    // Assuming each poule should have 4 teams
    expect(generator.poules.every(poule => poule.length === 4)).toBeTruthy();
  });

  test('should distribute teams evenly among poules', () => {
    const generator = new TournamentGenerator(teams);
    generator.generatePoules();
    const pouleTeamCounts = generator.poules.map(poule => poule.length);
    // Assuming the test for even distribution
    expect(new Set(pouleTeamCounts).size).toBe(1);
  });

  test('should not have any team in multiple poules', () => {
    const generator = new TournamentGenerator(teams);
    generator.generatePoules();
    const allPouleTeams = generator.poules.flatMap(poule => poule.map(team => team.name));
    const uniqueTeams = new Set(allPouleTeams);
    expect(uniqueTeams.size).toBe(teams.length);
  });
});
