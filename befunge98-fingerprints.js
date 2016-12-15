 BefungeEngine.fingerprints[0x4e554c4c] = { /* NULL */
    A: function(engine) {
        engine.reverseDelta();
    },
    B: function(engine) {
        engine.reverseDelta();
    },
    C: function(engine) {
        engine.reverseDelta();
    },
    D: function(engine) {
        engine.reverseDelta();
    },
    E: function(engine) {
        engine.reverseDelta();
    },
    F: function(engine) {
        engine.reverseDelta();
    },
    G: function(engine) {
        engine.reverseDelta();
    },
    H: function(engine) {
        engine.reverseDelta();
    },
    I: function(engine) {
        engine.reverseDelta();
    },
    J: function(engine) {
        engine.reverseDelta();
    },
    K: function(engine) {
        engine.reverseDelta();
    },
    L: function(engine) {
        engine.reverseDelta();
    },
    M: function(engine) {
        engine.reverseDelta();
    },
    N: function(engine) {
        engine.reverseDelta();
    },
    O: function(engine) {
        engine.reverseDelta();
    },
    P: function(engine) {
        engine.reverseDelta();
    },
    Q: function(engine) {
        engine.reverseDelta();
    },
    R: function(engine) {
        engine.reverseDelta();
    },
    S: function(engine) {
        engine.reverseDelta();
    },
    T: function(engine) {
        engine.reverseDelta();
    },
    U: function(engine) {
        engine.reverseDelta();
    },
    V: function(engine) {
        engine.reverseDelta();
    },
    W: function(engine) {
        engine.reverseDelta();
    },
    X: function(engine) {
        engine.reverseDelta();
    },
    Y: function(engine) {
        engine.reverseDelta();
    },
    Z: function(engine) {
        engine.reverseDelta();
    }
};
BefungeEngine.fingerprints[0x524f4d41] = { /* ROMA */
    C: function(engine) {
        engine.stackStack.push(100);
    },
    D: function(engine) {
        engine.stackStack.push(500);
    },
    I: function(engine) {
        engine.stackStack.push(1);
    },
    L: function(engine) {
        engine.stackStack.push(50);
    },
    M: function(engine) {
        engine.stackStack.push(1000);
    },
    V: function(engine) {
        engine.stackStack.push(5);
    },
    X: function(engine) {
        engine.stackStack.push(10);
    }
};
BefungeEngine.fingerprints[0x4d4f4455] = { /* MODU */
    M: function(engine) {
        var b = engine.stackStack.pop();
        var a = engine.stackStack.pop();
        if (b === 0)
            engine.stackStack.push(0);
        else if ((a < 0) === (b < 0))
            engine.stackStack.push(a % b);
        else
            engine.stackStack.push((a % b + b) % b);
    },
    R: function(engine) {
        var b = engine.stackStack.pop();
        var a = engine.stackStack.pop();
        if (b === 0)
            engine.stackStack.push(0);
        else
            engine.stackStack.push(a < 0 ? -(Math.abs(a) % Math.abs(b)) : Math.abs(a) % Math.abs(b));
    },
    U: function(engine) {
        var b = engine.stackStack.pop();
        var a = engine.stackStack.pop();
        if (b === 0)
            engine.stackStack.push(0);
        else
            engine.stackStack.push(Math.abs(a) % Math.abs(b));
    }
};