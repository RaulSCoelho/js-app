'use client'

import { MaybePromise, maybePromise } from '@js-app/shared-utils'

import { Modal, useConfirmationModal } from '@/components/modal'

import { Button } from '../button'

export function ConfirmationModal() {
  const { question, onConfirm, onCancel, isLoading, setIsLoading, confirmationModal, ...rest } = useConfirmationModal()

  const handleAction = (action?: MaybePromise<() => void>, setLoading?: boolean) => async () => {
    setLoading && setIsLoading(true)
    await maybePromise(action)
    setLoading && setIsLoading(false)
    confirmationModal.close()
  }

  return (
    <Modal
      onClose={handleAction(onCancel)}
      fullScreen={false}
      isKeyboardDismissDisabled={false}
      isDismissable
      {...rest}
    >
      <Modal.Body>
        <p>{question}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onPress={handleAction(onCancel)}>Cancelar</Button>
        <Button onPress={handleAction(onConfirm, true)} isLoading={isLoading}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
