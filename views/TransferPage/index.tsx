import { ADDRESS_ZERO, LIST_TOKENS } from '@/common/constants';
import useTransfer from '@/hooks/useTransfer';
import useGlobalStore from '@/stores/useGlobalStore';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

const TransferPage = () => {
  const { isLoading, onTransfer } = useTransfer();
  const { isWalletConnected } = useGlobalStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedToken, setSelectedToken] = useState(LIST_TOKENS[0].address);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [hash, setHash] = useState('');

  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) =>
    setAmount(e.target.value);
  const handleChangeRecipient = (e: ChangeEvent<HTMLInputElement>) =>
    setRecipient(e.target.value);

  const handleTransfer = async () => {
    if (!recipient && !amount) return;

    const data = await onTransfer({
      recipient,
      amount,
      tokenAddress: selectedToken,
    });
    console.log('handleTransfer ~ data:', data);

    const isError = data.isErr;

    if (!isError) {
      setAmount('');
      setRecipient('');
      setHash(data.data);
      onOpen();
      return;
    }

    toast.error(data.data.message);
  };

  if (!isWalletConnected) return null;

  return (
    <Box>
      <FormControl mb={4}>
        <FormLabel>Select token:</FormLabel>
        <RadioGroup onChange={setSelectedToken} value={selectedToken}>
          <Stack direction='row'>
            {LIST_TOKENS.map(({ address, id }) => (
              <Radio key={address} value={address}>
                {id}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </FormControl>

      <Box w='50%'>
        <FormControl mb={4} isRequired>
          <FormLabel>Amount:</FormLabel>
          <Input
            type='number'
            value={amount}
            onChange={handleChangeAmount}
            placeholder='Enter your amount'
          />
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Recipient:</FormLabel>
          <Input
            type='text'
            value={recipient}
            onChange={handleChangeRecipient}
            placeholder='Enter recipient address'
          />
        </FormControl>

        <Button isLoading={isLoading} onClick={handleTransfer}>
          Send
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Successfully</ModalHeader>
          <ModalCloseButton />

          <ModalBody>Your transaction has been sent.</ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant='ghost'
              as='a'
              target='_blank'
              href={`https://polygonscan.com/tx/${hash}`}>
              Go to scan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TransferPage;
