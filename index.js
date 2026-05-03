 function clearError() {
        const container = document.getElementById('inputContainer');
        const msg = document.getElementById('errorMsg');
        container.classList.remove('shake');
        container.style.borderColor = "#eee";
        msg.style.display = "none";
    }

    function getImages() {
        const input = document.getElementById('videoUrl');
        const container = document.getElementById('inputContainer');
        const msg = document.getElementById('errorMsg');
        const res = document.getElementById('resultContainer');
        
        const url = input.value.trim();
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);

        if (match && match[1]) {
            const id = match[1];
            container.style.borderColor = "#28a745";
            
            const hdUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
            const sdUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

            let testImg = new Image();
            testImg.onload = function() {
                const finalUrl = (this.width <= 120) ? sdUrl : hdUrl;
                document.getElementById('thumbImg').src = finalUrl;
                document.getElementById('hdLink').href = finalUrl;
                document.getElementById('sdLink').href = sdUrl;
                res.style.display = 'block';
                res.scrollIntoView({ behavior: 'smooth' });
            };
            testImg.src = hdUrl;

        } else {
            container.classList.add('shake');
            msg.style.display = "block";
            res.style.display = "none";
            input.focus();
        }
    }