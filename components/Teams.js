import React from 'react';

function Teams({ leagueData }) {
  return (
    <div>
      <h1>{leagueData.name}</h1>
      {leagueData.teams.map((team, index) => (
        <div key={index}>
          <h2>{team.name}</h2>
          <ul>
            {team.players.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Teams;
