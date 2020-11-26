import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import './styles.css';
import Logo from 'assets/images/eleicaoLogo.jpg';
import { login } from 'services/auth';
import api, { baseURLFront } from 'services/api';
import Loading from 'components/Loading';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [prev, setPrev] = useState('');
    const history = useHistory();

    useEffect(() => {
        
        if (document.referrer) {
            console.log('prera', baseURLFront)
            let data = document.referrer.replace(baseURLFront, "");
            console.log(data);
            setPrev(data);
        }

        if (localStorage.getItem('isInvalid')) {
            toast.error('Suas credênciais expiraram por favor, faça login novamente.');
            localStorage.clear();
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            email,
            password
        }

        try {
            const response = await api.post('api/v1/auth', data);

            if (response.status === 200) {
                login(response.data.token);
                toast.info(`Seja bem-vindo ${response.data.user.nome}.`);
                setLoading(false);
                if(prev) {
                    console.log('prev', prev);
                    history.push(prev);
                } else {
                    history.push('/admin');
                }
                return;
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else if (error.response.status === 500) {
                    toast.error('Error interno no servidor.');
                }
            } else {
                toast.error('Ops! Sem conexão com a base de dados.\n Tente novamente em alguns instantes.');
            }
            
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Loading  load={loading}/>
            <section className="container">
                <h1 className="mt-4">Painel Eleições 2020</h1>
                <div className="row">
                    <form className="card p-4 mt-5 col-5" onSubmit={handleSubmit}> 
                        <h2 className="pl-3 pt-3">Painel para administradores.</h2>
                        <div className="card-body">
                            <input type="text" className="form-control mb-2" placeholder="Seu email" onChange={e => setEmail(e.target.value)} value={email} required/>
                            <input type="password" className="form-control mb-2" placeholder="Sua senha" onChange={e => setPassword(e.target.value)} value={password} required/>
                            <button className="btn btn-primary mt-2 mb-5" type="submit">Entrar</button>
                        </div>
                    </form>
                    <div className="mt-5 image-logo col-7">
                        <img src={Logo} alt="eleicao"/>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;