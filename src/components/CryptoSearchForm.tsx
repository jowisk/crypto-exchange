import { ChangeEvent, FormEvent, useState } from "react"
import { useCryptoStore } from "../store"
import { currencies } from "./data"
import { Pair } from "./types"
import ErrorMessage from "./ErrorMessage"


const CryptoSearchForm = () => {

    const cryptoCurrencies = useCryptoStore((state) => state.cryptoCurrencies)
    const fetchData = useCryptoStore((state) => state.fetchData)
    const [pair, setPair] = useState<Pair>({
        currency: '',
        cryptoCurrency: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value 
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(pair).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }
        setError('')
        fetchData(pair)
    }

  return (
    <form 
        className='form'
        onSubmit={handleSubmit}
    >
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className='field'>
            <label htmlFor="currency">Moneda:</label>
            <select 
                name="currency" 
                id="currency"
                onChange={handleChange}
                value={pair.currency}
            >
                <option value="">-- Seleccione --</option>
                {currencies.map(currency => (
                    <option 
                        key={currency.code}
                        value={currency.code}
                    >{currency.name}</option>
                ))}
            </select>
        </div>

        <div className='field'>
            <label htmlFor="cryptoCurrency">Criptomoneda:</label>
            <select 
                name="cryptoCurrency" 
                id="cryptoCurrency"
                onChange={handleChange}
                value={pair.cryptoCurrency}
            >
                <option value="">-- Seleccione --</option>
                {cryptoCurrencies.map(cryptoCurrency => (
                    <option
                        key={cryptoCurrency.CoinInfo.FullName}
                        value={cryptoCurrency.CoinInfo.Name}
                    >{cryptoCurrency.CoinInfo.FullName}</option>
                ))}
            </select>
        </div>

        <input type="submit" value="cotizar" />
    </form>
  )
}

export default CryptoSearchForm