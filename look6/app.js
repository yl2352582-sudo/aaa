// Collage App
fetch("data.json").then(function(r){ return r.json(); }).then(function(DATA){
    if(!DATA || !DATA.items) return;

    var canvas = document.getElementById("canvas");
    canvas.style.width = DATA.canvasWidth + "px";
    canvas.style.height = DATA.canvasHeight + "px";

    DATA.items.forEach(function(item){
        if(item.type === "text"){
            var el;
            if(item.url){
                el = document.createElement("a");
                el.href = item.url;
                el.target = "_blank";
                el.style.textDecoration = "none";
            }else{
                el = document.createElement("div");
            }
            el.className = "item text-item";
            el.textContent = item.text;
            el.style.left = item.x + "px";
            el.style.top = item.y + "px";
            el.style.color = item.color || "#333";
            el.style.fontSize = (item.fontSize || 24) + "px";
            el.style.fontFamily = '"Microsoft YaHei","PingFang SC",sans-serif';
            el.style.fontWeight = "600";
            el.style.position = "absolute";
            el.style.whiteSpace = "pre-wrap";
            if(item.rotation) el.style.transform = "rotate(" + item.rotation + "deg)";
            if(item.opacity !== undefined) el.style.opacity = item.opacity;
            el.style.zIndex = item.zIndex || 1;
            canvas.appendChild(el);
            return;
        }

        var img = document.createElement("img");
        img.className = "item";
        img.src = item.image || "";
        img.style.left = item.x + "px";
        img.style.top = item.y + "px";
        img.style.width = item.width + "px";
        img.style.height = item.height + "px";
        if(item.rotation) img.style.transform = "rotate(" + item.rotation + "deg)";
        if(item.opacity !== undefined) img.style.opacity = item.opacity;
        img.style.zIndex = item.zIndex || 1;
        img.dataset.clickable = item.clickable !== false ? "true" : "false";
        img.dataset.name = item.name || "";
        img.dataset.price = item.price || "";
        img.dataset.url = item.url || "";
        img.dataset.brand = item.brand || "";
        img.dataset.tags = item.tags || "";
        img.dataset.sku = item.sku || "";
        img.dataset.desc = item.description || "";
        img.dataset.detail = item.detailImage || "";
        canvas.appendChild(img);
    });

    // after images are created, bind click handlers
    var panel = document.getElementById("sidePanel");
    var detailImg = document.getElementById("detailImg");
    var detailBrand = document.getElementById("detailBrand");
    var detailName = document.getElementById("detailName");
    var detailDesc = document.getElementById("detailDesc");
    var detailTags = document.getElementById("detailTags");
    var detailPrice = document.getElementById("detailPrice");
    var detailSku = document.getElementById("detailSku");
    var detailBuy = document.getElementById("detailBuy");

    document.querySelectorAll(".item").forEach(function(img){
        img.addEventListener("click", function(e){
            e.stopPropagation();
            if(this.dataset.clickable === "false") return;
            if(this.classList.contains("text-item")) return;
            detailImg.src = this.dataset.detail || this.src;
            detailBrand.textContent = this.dataset.brand || "";
            detailName.textContent = this.dataset.name || "";
            detailDesc.textContent = this.dataset.desc || "";
            detailPrice.textContent = this.dataset.price || "";
            detailSku.textContent = this.dataset.sku || "";
            detailBuy.href = this.dataset.url || "#";
            var tagsEl = detailTags;
            if(tagsEl){
                tagsEl.textContent = this.dataset.tags || "";
                tagsEl.style.display = this.dataset.tags ? "block" : "none";
            }
            panel.classList.add("open");
            document.getElementById("overlay").classList.add("on");
            document.getElementById("overlay").classList.add("on");
        });
    });

    window.closePanel = function(){
        panel.classList.remove("open");
        document.getElementById("overlay").classList.remove("on");
    };

    document.addEventListener("click", function(e){
        if(panel.classList.contains("open") &&
           !panel.contains(e.target) &&
           !e.target.classList.contains("item")){
            closePanel();
        }
    });
});
