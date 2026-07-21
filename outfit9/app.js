// Collage App
fetch("data.json").then(function(r){ return r.json(); }).then(function(DATA){
    if(!DATA || !DATA.items) return;

    var canvas = document.getElementById("canvas");
    canvas.style.width = DATA.canvasWidth + "px";
    canvas.style.height = DATA.canvasHeight + "px";

    DATA.items.forEach(function(item){
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
    var detailTagsWrap = document.getElementById("detailTagsWrap");
    var detailPrice = document.getElementById("detailPrice");
    var detailSku = document.getElementById("detailSku");
    var detailBuy = document.getElementById("detailBuy");

    document.querySelectorAll(".item").forEach(function(img){
        img.addEventListener("click", function(e){
            e.stopPropagation();
            if(this.dataset.clickable === "false") return;
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
