import React, { useRef, useState } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'

type DeleteButtonProps = {
  onDelete: () => void
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  return (
    <>
      <Button colorScheme="red" variant="ghost" onClick={() => setIsOpen(true)}>
        <FaTrash />
      </Button>
      <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={useRef(null)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Törlés
            </AlertDialogHeader>

            <AlertDialogBody>Biztosan törölnéd ezt a példányt?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={undefined} onClick={onClose}>
                Mégse
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onDelete()
                  onClose()
                }}
                ml={3}
              >
                Törlés
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
