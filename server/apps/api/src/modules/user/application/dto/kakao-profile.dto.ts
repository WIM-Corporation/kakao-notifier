export class KakaoProfileDto {
  uid?: string;
  email!: string;
  displayName!: string;
  photoURL?: string;

  constructor(props: KakaoProfileDto) {
    Object.assign(this, props);
  }
}
