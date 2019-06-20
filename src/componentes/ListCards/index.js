import React from 'react';
import { Container, Repository } from './styles';

const ListCards = ({ repositories, removeRepo, handleUpdateRepository }) => (
  <Container>
    {repositories.map(e => (
      <Repository key={e.id}>
        <header>
          <img src={e.owner.avatar_url} alt="facebook" />
          <strong>{e.owner.login}</strong>
          <small>{e.name}</small>
        </header>

        <ul>
          <li>
            {e.stargazers_count} <small> stars</small>
          </li>
          <li>
            {e.forks_count} <small> forks</small>
          </li>
          <li>
            {e.open_issues_count}
            <small> issues</small>
          </li>
          <li>
            {e.lastCommit}
            <small> last commit</small>
          </li>
        </ul>
        <div className="buttons-container">
          <button type="button" onClick={() => handleUpdateRepository(e.id)}>
            <i className="fa fa-retweet" />
            Atualizar
          </button>
          <button type="button" onClick={() => removeRepo(e.id)}>
            <i className="fa fa-retweet" />
            Excluir
          </button>
        </div>
      </Repository>
    ))}
  </Container>
);

export default ListCards;
