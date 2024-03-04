const TournamentGenerator = require('../src/tournamentGenerator');

describe('TournamentGenerator', () => {
  const teams = [
    { name: 'Team 1', players: ['A', 'B', 'C'] },
    { name: 'Team 2', players: ['D', 'E', 'F'] },
    { name: 'Team 3', players: ['G', 'H', 'I'] },
    { name: 'Team 4', players: ['J', 'K', 'L'] },
  ];

  test('should generate poules correctly', () => {
    const generator = new TournamentGenerator(teams);
    generator.generatePoules();
    expect(generator.poules.every(poule => poule.length === 4)).toBeTruthy();
  });

  test('should distribute teams evenly among poules', () => {
    const generator = new TournamentGenerator(teams);
    generator.generatePoules();
    const pouleTeamCounts = generator.poules.map(poule => poule.length);
    expect(new Set(pouleTeamCounts).size).toBe(1);
  });

  test('should not have any team in multiple poules', () => {
    const generator = new TournamentGenerator(teams);
    generator.generatePoules();
    const allPouleTeams = generator.poules.flatMap(poule => poule.map(team => team.name));
    const uniqueTeams = new Set(allPouleTeams);
    expect(uniqueTeams.size).toBe(teams.length);
  });

  test('should display the correct tournament results', () => {
    const generator = new TournamentGenerator(teams);
    generator.generateTournament();

    const consoleSpy = jest.spyOn(console, 'log');

    generator.displayTournamentResults();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Le gagnant du tournoi est :'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Le finaliste du tournoi est :'));

    consoleSpy.mockRestore();
  });
});
