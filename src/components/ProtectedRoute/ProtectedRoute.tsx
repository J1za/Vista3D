import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext/AuthContext'
import { useModal } from '../../../context/ModalProvider';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const router = useRouter()
  const {
    loginModal: { toggleModal },
  }: any = useModal();
  const handleOpenModal = () => toggleModal();
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [router, user])

  return <>{user ? children : null}</>
}

export default ProtectedRoute