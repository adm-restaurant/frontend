<template>
    <footer id="footer">
        <p>Top Burger &copy; 2023</p>
    </footer>
</template>

<script>
export default{
    name: "Footer"
}
</script>


<style scoped>
    #footer{
        width: 100%;
        height: 200px;
        background-color: #222;
        border-top: 4px solid #111;
        color: #FCBA03;
        display:flex;
        align-items: center;
        justify-content: center;
        bottom: 0;
        left: 0;
        position:static;
        padding: 15px 50px;
    }
</style>
