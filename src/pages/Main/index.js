import React, { Component } from 'react';

import moment from 'moment';
import logo from '../../assest/gitcompare.png'; // './logo.svg';

import { Container, Imagem, Form } from './styles';

import ListCards from '../../componentes/ListCards';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    repositoryInput: '',
    loading: false,
    error: null,
    repositories: [],
  };

  handleRepository = async (e) => {
    e.preventDefault();
    const { repositoryInput, repositories } = this.state;
    this.setState({ error: '', repositoryInput: '', loading: true });

    try {
      const { data: repo } = await api.get(`repos/${repositoryInput}`);
      repo.lastCommit = moment(repo.pushed_at).fromNow();
      repositories.push(repo);
      this.setState({ repositories });
      localStorage.setItem('@modulo02:repositories', JSON.stringify(repositories));
    } catch (er) {
      this.setState({ error: er });
    } finally {
      this.setState({ loading: false });
    }
  };

  removeRepo = async (id) => {
    const { repositories } = this.state;

    const updatedRepositories = repositories.filter(repository => repository.id !== id);

    this.setState({ repositories: updatedRepositories });

    await localStorage.setItem('@modulo02:repositories', JSON.stringify(updatedRepositories));
  };

  handleUpdateRepository = async (id) => {
    const { repositories } = this.state;

    const repository = repositories.find(repo => repo.id === id);

    try {
      const { data } = await api.get(`repos/${repository.full_name}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        error: false,
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
      });

      await localStorage.setItem('@modulo02:repositories', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ error: true });
    }
  };

  componentDidMount = () => {
    const repos = localStorage.getItem('@modulo02:repositories');
    if (repos) {
      const repositories = JSON.parse(repos);
      this.setState({ repositories });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <Container className="App">
        <header className="App-header">
          <Imagem src={logo} className="App-logo" alt="logo" />

          <Form onSubmit={this.handleRepository}>
            <input
              placeholder="usuário/repositorio"
              value={this.state.repositoryInput}
              onChange={e => this.setState({ repositoryInput: e.target.value })}
            />
            <button type="submit">
              {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'ADD'}
            </button>
          </Form>
          {error && (
            <div>
              <strong style={{ color: '#fff', fontWeight: 'bold', marginTop: '10px' }}>
                Repositório / usuário não encontrados!
              </strong>
            </div>
          )}
        </header>
        <ListCards
          repositories={this.state.repositories}
          removeRepo={this.removeRepo}
          handleUpdateRepository={this.handleUpdateRepository}
        />
      </Container>
    );
  }
}
