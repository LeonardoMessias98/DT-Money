import { useState, FormEvent } from 'react';
import Modal from 'react-modal';

import closeImg from 'assets/close.svg';
import incomeImg from 'assets/income.svg';
import outcomeImg from 'assets/outcome.svg';
import { useTransactions } from 'hooks/useTransactions';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

Modal.setAppElement('#root');

interface NewTransactionModalProps {
  isOpen: boolean, 
  onRequestClose: () => void
}

const NewTransactionModal = ({ isOpen, onRequestClose }:NewTransactionModalProps) => {
  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  const [type, setType] = useState('deposit');


  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault();

    await createTransaction({
      title, 
      amount,
      category,
      type
    });

    setTitle('');
    setAmount(0);
    setCategory('');

    onRequestClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      overlayClassName="react-modal-overlay" 
      className="react-modal-content"
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input 
          placeholder="Título"
          onChange={e => setTitle(e.target.value)} 
        />

        <input 
          placeholder="Valor" 
          type="number" 
          onChange={e => setAmount(Number(e.target.value))} 
        />

        <TransactionTypeContainer >
          <RadioBox 
            type="button" 
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >     
            <img src={incomeImg} alt="entrada"/>
            <span>
              Entrada
            </span>
          </RadioBox>

          <RadioBox 
            type="button" 
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >        
            <img src={outcomeImg} alt="saida" />
            <span>
              Saída
            </span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
          placeholder="Categoria" 
          onChange={e => setCategory(e.target.value)} 
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}

export default NewTransactionModal;
