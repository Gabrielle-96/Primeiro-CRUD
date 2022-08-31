const jwt = require('jsonwebtoken');

exports.required = (req, res, next) => {

    try {
        //obtém o token do cabeçalho da requisição (req.headers)
        const token = req.headers.authorization.split(' ')[1];

        //valida se o token pe um token válido (validade e a chave que está no .env)
        const decode = jwt.verify(token, process.env.JWT_KEY);

        //obtem os dados que foram gravados no token
        //e adiciona no objeto req
        //então nas controllers pode acessar a posição user (req.user) que terá os dados do usuário
        req.user = decode;

        //segue adiante com a requisição
        next();
    } catch (error) {
        console.log(error);
        //caso o jwt.verify dê erro, cairá aqui no catch
        return res.status(401).send({ mensagem: 'Falha na autenticação' });
    }

}