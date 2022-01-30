const $ = ( x ) => document.querySelector(x)
const $$ = ( x ) => document.querySelectorAll(x)
const log = ( x ) => console.log(x)
const max = ( a , b ) => ( a > b ) ? a : b
const min = ( a , b ) => ( a < b ) ? a : b
const logElement = $('.log')
const wallpaper = $('.wallpaper')

let N = 5;
let M = 10;
let level = 1;
let Main = {
    x: 0,
    y: 0,
    energy: 5,
    score: 0
}

let A;

function CreatMap  ( mode = 0 ) {
        if ( mode == 1 ) {
            N += Math.floor(Math.random() * level) + 1 ;
            M += Math.floor(Math.random() * level) + 1 ;
        } else if ( mode == 0 ) {
            N = 5;
            M = 10;
            Main.x = Main.y = Main.score = 0;
            Main.energy = 5;
            level = 1;
        }

        A = new Array(N);

        for ( let i = 0 ; i < N ; ++i ) {
            A[i] = [];
            for ( let j = 0 ; j < M ; ++j ) {
                A[i][j] = Math.floor(Math.random() * 2.1);
            }
        }

        A[N-1][M-1] = A[0][0] = -1;
        Main.x = Main.y = 0;
}

function PrintMap () {
    A[Main.x][Main.y] = 3;
    let html = '' ,
        getColor = [ "orange","#2ab7ca" , "#fe4a49" , "#fed766" , "violet"];
        getValue = [ "SS" , " " , "░" , "�" , "웃"];
    for ( let i = 0 ; i < N ; ++i ) {
        let subHtml = '';
        for ( let j = 0 ; j < M ; ++j ) {
            subHtml += `
            <div class="row__item" style="background-color: ${getColor[A[i][j] + 1]};">
                <p class="row__item--value" data-row = ${i} data-collum = ${j} > ${getValue[A[i][j] + 1]} </p>
            </div>`
        }
        html += `<div class="row"> ${subHtml} </div>`
    }
    wallpaper.innerHTML = html;

    logElement.innerHTML = `
        <div class="log__poisition">
            <p> Tọa Độ : </p>
            <p> X : ${Main.x + 1} </p>
            <p> Y : ${Main.y + 1} </p>
        </div>
        <div class="log__main">
            <p> Thể lực : ${Main.energy} </p>
            <p> Điểm : ${Main.score} </p>
            <p> Level : ${level} </p>
        </div>
    `    
}

function Move () {
    document.addEventListener('keydown' , key => {
        let x = key.keyCode
        let x1 = Main.x , y1 = Main.y;
        A[x1][y1] = 0;
        switch ( x ) {
            case 37: 
                log('Trái');
                    y1--;
                if ( 0 <= y1 ) {
                    if ( A[x1][y1] != 0 ) {
                        if ( A[x1][y1] == 1 ) {
                            Main.energy--;
                        } else if ( A[x1][y1] == 2 ) {
                            Main.score += Math.floor(Math.random() * 2) + 1;
                            Main.energy++;
                            
                        }
                    }
                    if ( Main.energy > 0 ) {
                        Main.x = x1;
                        Main.y = y1;
                    } else {
                        CreatMap();
                    }
                }
                break;
            case 38: 
                log('Trên');
                    x1--;
                if ( 0 <= x1 ) {
                    if ( A[x1][y1] != 0 ) {
                        if ( A[x1][y1] == 1 ) {
                            Main.energy--;
                        } else if ( A[x1][y1] == 2 ) {
                            Main.score += Math.floor(Math.random() * 2) + 1;
                            Main.energy++;
                            
                        }
                    }
                    if ( Main.energy > 0 ) {
                        Main.x = x1;
                        Main.y = y1;
                    } else {
                        CreatMap();
                    }
                }
                break;
            case 39: 
                log('Phải');
                    y1++;
                    if ( y1 < M ) {
                        if ( A[x1][y1] != 0 ) {
                            if ( A[x1][y1] == 1 ) {
                                Main.energy--;

                            } else if ( A[x1][y1] == 2 ) {
                                Main.score += Math.floor(Math.random() * 2) + 1;
                                Main.energy++;
                                
                            }
                        }
                        if ( Main.energy > 0 ) {
                            Main.x = x1;
                            Main.y = y1;
                        } else {
                            CreatMap();
                        }
                    }
                break;
            case 40: 
                log('Dưới');
                    x1++;
                    if ( x1 < N ) {
                        if ( A[x1][y1] != 0 ) {
                            if ( A[x1][y1] == 1 ) {
                                Main.energy--;
                            } else if ( A[x1][y1] == 2 ) {
                                Main.score += Math.floor(Math.random() * 2) + 1;
                                Main.energy++;
                            }
                        }
                        if ( Main.energy > 0 ) {
                            Main.x = x1;
                            Main.y = y1;
                        } else {
                            CreatMap();
                        }
                    }
                break;
            case 82: 
                CreatMap();
                break;
        }

        if ( Main.x == N - 1 && Main.y == M - 1 ) {
            level++;
            Main.score += level * ( Math.floor(Math.random() * 2) + 1 );
            Main.energy += 3;
            CreatMap(1);
        }

        PrintMap();
    })
}

function Start () {
    CreatMap(0);
    PrintMap();
    Move();
}

Start();




