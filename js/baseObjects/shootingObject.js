import Bullet from '../bullet';
import GameObject from './gameObject';

export default class ShootingObject extends GameObject {
    constructor(props) {
        super({...props});
        this.bulletSpeed = 15;
        this.bullets = [];

        this.maxBullets = 10;
        this.shoots = 0;

        this.shootsUp = true;
    }
    
    fireBullet() {
        if (this.shoots < this.maxBullets) {
            let bullet = this.createBullet();
            this.bullets.push(bullet);
            this.shoots += 1;
        }
    }

    createBullet() {
        let bullet = new Bullet(this.x, this.y, this.bulletSpeed, this.shootsUp);
        bullet.setShootingObject(this);
        this.parent.addChild(bullet);

        return bullet;
    }

    updateBullets() {
        for (const i in this.bullets) {
            const bullet = this.bullets[i];
            bullet.shoot();

            if (bullet.isDead) {
               this.parent.removeChild(bullet);
               this.bullets.splice(i, 1);
            }
            
        }
    }

    resetBullets() {
        this.shoots = 0;
        
        if (this.bullets.length > 0) {
            for (const bullet of this.bullets) {
                this.parent.removeChild(bullet);
            }

            this.bullets = [];
        }
    }
};