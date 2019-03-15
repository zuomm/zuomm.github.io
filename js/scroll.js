// 立即指向函数形成闭包
(()=> {
  const handleScoll = (() => {
    const process = document.querySelector('#site-process')
    let isRunning = false;

    return () => {
      if (isRunning) return;
      isRunning = true;

      window.requestAnimationFrame( ts => {
        // 获取滚动条到顶部的垂直高度 (即网页被卷上去的高度) 
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop, // firefox / IE
        scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight, // 浏览器滚动条滚动后隐藏的页面内容高度
        clientHeight = document.documentElement.clientHeight || document.body.clientHeight; // 网页可视区域的高度和宽度
        isRunning = false;
        
        let percent  = 100 * scrollTop / (Number(scrollHeight) - Number(clientHeight))
        if (percent > 99) {
          percent = 100;
        } else if (percent < 1) {
          percent = 0;
        }
        
        process.style.width =  `${percent}%`
      });
    };
  })();
  // refresh pages
  handleScoll();
  document.addEventListener('scroll',handleScoll)
})();