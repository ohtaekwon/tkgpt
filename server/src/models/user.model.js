import crypto from "crypto";
import mongoose from "mongoose";

/**
 * @argument username 사용자 이름을 나타내는 문자열 속성입니다. 이 속성은 필수(required)이며, 중복 값을 허용하지 않는 unique속성을 가지고 있습니다.
 * @argument password 사용자 비밀번호를 나타내는 문자열 속성입니다. 이 속성은 필수(required)이며, 데이터를 조회할 때(select)는 반환되지 않도록 설정됩니다.
 * @argument slat 사용자 비밀번호를 암호화하는 데 사용되는 salt 값을 나타내는 문자열 속성입니다. 이 속성은 필수(required)이며, 데이터를 조회할 때(select)는 반환되지 않도록 설정됩니다.
 * @argument timestamps 해당 도큐먼트가 생성된 시간과 마지막으로 업데이트된 시간을 자동으로 기록하는 옵션입니다.
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

/**
 * @description userSchema에서 사용되는 메소드 중 하나인 setPassword를 정의합니다.
 * 사용자의 비밀번호를 안전하게 하기 위해 slat와 해시화된 비밀번호를 함께 사용하여 암호화하는 기능을 구현을 담당합니다.
 */
userSchema.methods.setPassword = function (password) {
  // 16바이트의 랜덤 salt 값을 생성합니다. 이 salt 값은 사용자 비밀번호를 암호화할 때 사용됩니다.
  // 생성된 salt 값을 this.salt 속성에 저장합니다.
  this.salt = crypto.randomBytes(16).toString("hex");
  // crypto.pbkdf2Sync() 메소드를 사용하여 password, salt, 1000, 64, sha512 알고리즘을 인자로 전달하여 사용자 비밀번호를 암호화합니다. 이 메소드는 비밀번호를 해싱하여 저장하는 데 사용됩니다.
  // 암호화된 비밀번호를 this.password 속성에 저장합니다.
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

/**
 * @description userSchema에서 사용되는 메소드 중 하나인 validPassword를 정의합니다.
 * 이 메소드는 사용자가 입력한 비밀번호가 저장된 비밀번호와 일치하는지 확인하는 기능을 수행합니다.
 */
userSchema.methods.validPassword = function (password) {
  // 입력된 password와 저장된 this.salt를 사용하여 crypto.pbkdf2Sync() 메소드를 사용하여 비밀번호를 해시화합니다.
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  // 저장된 비밀번호(this.password)와 해시화된 비밀번호(hash)를 비교하여 일치 여부를 확인합니다.
  return this.password === hash; // 비밀번호가 일치하면 true, 일치하지 않으면 false를 반환합니다.
};

const User = mongoose.model("User", userSchema);
export default User;
