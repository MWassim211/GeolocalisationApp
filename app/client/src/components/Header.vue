<template>
    <nav>
        <ul>
            <li><router-link to="/" exact>Home</router-link></li> |
            <li><router-link to="/settings" exact>Settings</router-link></li> |
            <li><router-link to="/about" exact>About</router-link></li>
        </ul>
    </nav>
</template>

<script scoped>
export default {
    name : "Header"
}
</script>

<style>
ul{
    list-style-type: none;
    text-align: center;
    margin: 0;
}
li{
    display: inline-block;
    margin: 0 10px;
}
a{
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}
nav{
    background: #444;
    padding: 14px 0;
    margin-bottom: 40px;
}
.router-link-active{
    background: #eee;
    color: #444;
}
</style>