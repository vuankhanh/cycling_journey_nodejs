const app = require("./src/app");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, ()=>{
    console.log(`WSV cycling journey start with: ${PORT}`);
});

process.on('SIGINT', ()=>{
    console.log(`Exit Server Express`);
})