import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  justify-content: space-between;
  align-items: center;
`;

export const Imagem = styled.img``;

export const Form = styled.form`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  display: flex;
  input {
    flex: 1;
    height: 55px;
    padding: 0 20px;
    border: 0;
    background: #e8e8e8;
    font-size: 18px;
    color: #444;
    border-radius: 3px;
  }
  button {
    width: 80px;
    height: 55px;
    padding: 0 20px;
    margin-left: 10px;
    background: #63f5b8;
    color: #fff;
    border: 0;
    font-size: 20px;
    font-weight: bold;
    border-radius: 3px;
    &:hover {
      background: #52d89f;
    }
  }
`;
