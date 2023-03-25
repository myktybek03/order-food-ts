import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

type Props = {
    price: number
    onClose: () => void
    onOrder: () => void
}

const TotalAmount = ({ price, onClose, onOrder }: Props) => {
    const orderButton =
        price > 0 ? <StyledButton onClick={onOrder}>Order</StyledButton> : null

    const fixedPrice = price.toFixed(2)

    return (
        <Container>
            <InfoContainer>
                <Label>Total amount</Label>
                <Price>${fixedPrice}</Price>
            </InfoContainer>
            <ActionButtonsContainer>
                <StyledButtonClose variant="outlined" onClick={onClose}>
                    close
                </StyledButtonClose>
                {orderButton}
            </ActionButtonsContainer>
        </Container>
    )
}

export default TotalAmount

const Label = styled('p')(() => ({
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center',
    margin: 0,
}))

const Price = styled('p')(() => ({
    fontWeight: '600',
    fontSize: '22px',
    lineHeight: '33px',
    color: '#b4461a',
    margin: 0,
}))

const InfoContainer = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
}))

const ActionButtonsContainer = styled('div')(() => ({
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
}))

const Container = styled('div')(() => ({
    margin: '30px 0 0 0',
}))

const StyledButtonClose = styled(Button)(() => ({
    color: '#5A1F08s',
    backgroundColor: '#fff',
    borderRadius: '30px',
    border: '#5A1F08',
    padding: '10px 25px',
    '&:hover': {
        color: '#451907',
    },
}))

const StyledButton = styled(Button)(() => ({
    backgroundColor: '#b4461a',
    color: '#fff',
    borderRadius: '30px',
    padding: '10px 25px',
    '&:hover': {
        background: '#451907',
    },
}))
