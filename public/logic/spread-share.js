
    const
    shareBtns = document.querySelectorAll('.card-share-button'),
    courseCards = document.querySelectorAll('.card')



    shareBtns.forEach(shareBtn => {
        // console.log(shareBtn)
        const
    courseId = shareBtn.getAttribute('data-course-id'),
    courseName = shareBtn.getAttribute('data-course-name'),
    courseLink = `https://www.widespread.world/academy/explore/course/${courseId}`
    console.log('courseId: ', courseId)
    console.log('courseName: ', courseName)
    console.log('courseLink: ', courseLink)

    const shareData = {
        title: courseName,
    text: `Check out ${courseName} on WideSpread Academy!`,
    url: courseLink
                }

    const shareResult = document.querySelector('.share-result');


                // Share must be triggered by "user activation"
                shareBtn.addEventListener('click', async () => {
                    try {
                        const filesArray = []
    let myHeaders = new Headers({
        'Content-Type': 'image/png'
                        });
    console.log(myHeaders)
    const myRequest = await new Request('images/system/widespread_logo_1a1a1a.png', {
        method: 'GET',
    headers: myHeaders,
    mode: 'no-cors',
    cache: 'default',
                        });

    fetch(myRequest)
                            .then(response => response.blob())
                            .then(myBlob => {
        console.log('myBlob')
                                console.log(myBlob)
    let myImage = URL.createObjectURL(myBlob);
    filesArray.push(myImage)
    console.table(filesArray)
                            });
    if (navigator.canShare && navigator.canShare({files: filesArray })) {
        navigator.share({
            files: filesArray,
            title: 'WideSpread Photos',
            text: 'WideSpread System Photos',
        })
            .then(() => console.log('Share was successful.'))
            .catch((error) => console.log('Sharing failed', error));
                        } else {
        shareResult.textContent = `Your device doesn't support sharing files.`
                            console.log(`Your system doesn't support sharing files.`);
                        }
    await navigator.share(shareData)
    shareResult.classList.remove('hidden')
    shareResult.textContent = `Sharing ${courseName}...`

    function removeShareResult() {
        shareResult.classList.add('hidden')
                            console.log("message disappeared");
                        }
    setTimeout(removeShareResult, 5000);
                    } catch (err) {
        shareResult.textContent = 'Error: ' + err
    }
                });
    })
